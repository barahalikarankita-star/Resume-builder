import { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const defaultResume = {
  name: 'James Smith',
  title: 'Software Engineer',
  profile: 'I am a software engineer with over ten years of experience in the development of enterprise applications.',
  phone: '(415) 413-0703',
  email: 'jamessmith@email.site.com',
  website: 'jamessmith.site.com',
  address: '1556 Buckley Lane, Kansas City, MO',
  photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=60',
  experience: [
    'Led development teams in the creation of enterprise systems',
    'Implemented agile development practices',
    'Software Developer'
  ],
  education: [
    'Dmitri Prokofich University — Computer Engineer (May 20XX)',
    'Dmitri Prokofich High School — High School Diploma in Sciences (June 20XX)'
  ],
  skills: [
    'Enterprise Application Development',
    'Object-Oriented Programming',
    'Software Project Management',
    'Relational and Non-Relational Database'
  ]
};

function App() {
  const [data, setData] = useState(defaultResume);

  const updateField = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (field, index, value) => {
    setData(prev => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const exportPdf = async () => {
    const resumeElement = document.getElementById('resume-preview');
    if (!resumeElement) return;

    const canvas = await html2canvas(resumeElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#f3e4d8'
    });

    const imageData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imageData);
    const ratio = Math.min(pageWidth / imgProps.width, pageHeight / imgProps.height);
    const imgWidth = imgProps.width * ratio;
    const imgHeight = imgProps.height * ratio;
    const x = (pageWidth - imgWidth) / 2;

    pdf.addImage(imageData, 'PNG', x, 20, imgWidth, imgHeight);
    pdf.save(`${data.name.replace(/\s+/g, '_')}_resume.pdf`);
  };

  return (
    <div className="page-shell">
      <header className="app-header">
        <div>
          <h1>Dynamic Resume Builder</h1>
          <p>Edit fields and see your resume update instantly.</p>
          <a
  href="https://www.linkedin.com/in/ankita-barahalikar"
  target="_blank"
  style={{
    display: "inline-block",
    marginTop: "10px",
    padding: "10px 15px",
    backgroundColor: "#0077b5",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px"
  }}
>
  Visit My LinkedIn
</a>
        </div>
        <button className="export-button" onClick={exportPdf}>Download PDF</button>
      </header>

      <div className="builder-layout">
        <section className="editor-panel">
          <div className="editor-card">
            <h2>Profile</h2>
            <label>
              Full Name
              <input value={data.name} onChange={e => updateField('name', e.target.value)} />
            </label>
            <label>
              Title
              <input value={data.title} onChange={e => updateField('title', e.target.value)} />
            </label>
            <label>
              Profile Text
              <textarea value={data.profile} onChange={e => updateField('profile', e.target.value)} rows="4" />
            </label>
            <label>
              Photo URL
              <input value={data.photoUrl} onChange={e => updateField('photoUrl', e.target.value)} />
            </label>
          </div>

          <div className="editor-card">
            <h2>Contact</h2>
            <label>
              Phone
              <input value={data.phone} onChange={e => updateField('phone', e.target.value)} />
            </label>
            <label>
              Email
              <input value={data.email} onChange={e => updateField('email', e.target.value)} />
            </label>
            <label>
              Website
              <input value={data.website} onChange={e => updateField('website', e.target.value)} />
            </label>
            <label>
              Address
              <input value={data.address} onChange={e => updateField('address', e.target.value)} />
            </label>
          </div>

          <div className="editor-card">
            <h2>Work Experience</h2>
            {data.experience.map((item, index) => (
              <label key={index}>
                Item {index + 1}
                <input
                  value={item}
                  onChange={e => updateArrayField('experience', index, e.target.value)}
                />
              </label>
            ))}
          </div>

          <div className="editor-card">
            <h2>Education</h2>
            {data.education.map((item, index) => (
              <label key={index}>
                Item {index + 1}
                <input
                  value={item}
                  onChange={e => updateArrayField('education', index, e.target.value)}
                />
              </label>
            ))}
          </div>

          <div className="editor-card">
            <h2>Skills</h2>
            {data.skills.map((item, index) => (
              <label key={index}>
                Item {index + 1}
                <input
                  value={item}
                  onChange={e => updateArrayField('skills', index, e.target.value)}
                />
              </label>
            ))}
          </div>
        </section>

        <section className="preview-panel">
          <div id="resume-preview" className="resume-card">
            <div className="resume-side resume-side--left">
              <div className="resume-photo" style={{ backgroundImage: `url(${data.photoUrl})` }} />

              <div className="resume-section">
                <h3>PROFILE</h3>
                <p>{data.profile}</p>
              </div>

              <div className="resume-section">
                <h3>CONTACT</h3>
                <p>{data.phone}</p>
                <p>{data.address}</p>
                <p>{data.email}</p>
                <p>{data.website}</p>
              </div>
            </div>

            <div className="resume-side resume-side--right">
              <div className="resume-header">
                <h1>{data.name}</h1>
                <h2>{data.title}</h2>
              </div>

              <div className="resume-section">
                <h3>WORK EXPERIENCE</h3>
                <ul>
                  {data.experience.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="resume-section">
                <h3>EDUCATION</h3>
                <ul>
                  {data.education.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="resume-section">
                <h3>SKILLS</h3>
                <ul>
                  {data.skills.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
