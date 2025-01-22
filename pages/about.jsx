const AboutPage = () => {
  return (
    <>
      <h3 style={{ textAlign: 'center', color: '#fff', margin: '20px 0' }}>
        A Little Bit About Me
      </h3>
      <div
        style={{
          padding: '20px',
          fontSize: '18px',
          lineHeight: '1.8',
          color: '#ddd',
          backgroundColor: '#1e1e2f',
          borderRadius: '10px',
          margin: '0 auto',
        }}
      >
        <p>
          Hi, I'm a <strong>Full-Stack Developer</strong> with over 6 years of experience in building robust, scalable, and high-performance web and mobile applications. My journey has been driven by a passion for technology and a commitment to delivering quality solutions for businesses of all sizes. I specialize in technologies like <strong>React.js</strong>, <strong>Node.js</strong>, <strong>Laravel</strong>, and <strong>React Native</strong>.
        </p>
        <p>
          My expertise spans the entire development lifecycle, from conceptualizing ideas to deploying production-ready solutions. I also excel in team leadership, code reviews, and cross-functional collaboration to achieve project goals.
        </p>
        <p>
          Beyond coding, I take pride in designing user-centric applications and mentoring junior developers to foster growth within the team.
        </p>
      </div>

      <h4 style={{ textAlign: 'center', margin: '40px 0', color: '#fff' }}>
        Professional Timeline
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
        {[
          {
            logo: 'https://waiyanmaing.web.app/assets/agga-aa5d85a4.png', // Replace with your path
            role: 'Web Developer, Full-Stack Developer, Team Leader',
            company: 'AGGA.IO',
            duration: 'September 2018 - January 2023',
            description: [
              'Developed and maintained web applications using PHP, Laravel, and related technologies.',
              'Collaborated with cross-functional teams to create high-quality products.',
              'Implemented responsive designs ensuring cross-browser compatibility.',
              'Developed mobile applications using Cordova, Framework7, and React Native.',
              'Maintained and troubleshot cloud and physical servers on Linux and Windows.',
              'Participated in code reviews and provided constructive feedback.',
              'Managed Agile sprints and version control using Git and Azure DevOps.',
            ],
          },
          {
            logo: 'https://waiyanmaing.web.app/assets/DAT%20Logo-07af71b5.png', // Replace with your path
            role: 'Senior Team Lead',
            company: 'DirAce Technology (Japan)',
            duration: 'March 2022 - March 2023',
            description: [
              'Deployed testing environments in collaboration with project managers and team members from Japan.',
              'Collaborated with cross-functional teams, including designers, product managers, and other developers, to deliver high-quality products.',
              'Implemented responsive designs and ensured cross-browser compatibility.',
              'Participated in code reviews and provided constructive feedback to other developers.',
            ]           
          },
          {
            logo: 'https://waiyanmaing.web.app/assets/grg-0bf60ef1.png', // Replace with your path
            role: 'Software Development Executive',
            company: 'Grand Royal Group International',
            duration: 'April 2023 - Present',
            description: [
              'Developing and maintaining web applications using React.js and related technologies, ensuring high performance and scalability.',
              'Collaborating with cross-functional teams, including designers, product managers, security team and other developers, to deliver high-quality, user-centric solutions.',
              'Implemented responsive designs and ensuring cross-browser compatibility for seamless user experiences.',
              'Participating in code reviews, providing constructive feedback, and fostering a culture of code quality and collaboration.',
              'Implementing and enhancing web security measures, including authentication, authorization, and data encryption, to safeguard applications.',
              'Maintaining and installing SSL certificates on application VM servers to ensure secure communication channels.',
              'Developing a chatbot application with Python, seamlessly integrated across web platforms, Telegram, Microsoft Teams and mobile apps to support various departments.',
            ]
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              width: '90%',
              maxWidth: '800px',
              backgroundColor: '#28293e',
              color: '#fff',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '-30px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '60px',
                height: '60px',
                backgroundColor: '#fff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <img
                src={item.logo}
                alt={`${item.company} Logo`}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div style={{ marginLeft: '80px' }}>
              <h5 style={{ margin: '0 0 10px', fontSize: '20px' }}>{item.role}</h5>
              <p style={{ margin: '0 0 10px', fontWeight: 'bold' }}>{item.company}</p>
              <p style={{ margin: '0 0 15px', fontSize: '14px', color: '#aaa' }}>{item.duration}</p>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.6', margin: '0', fontSize: '16px' }}>
                {item.description.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'About' },
  };
}

export default AboutPage;
