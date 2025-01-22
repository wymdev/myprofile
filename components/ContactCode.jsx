import styles from '../styles/ContactCode.module.css';

const contactItems = [
  {
    social: 'website',
    link: 'waiyanmaing.vercel',
    href: 'https://waiyanmaing.vercel.app/',
  },
  {
    social: 'email',
    link: 'waiyanmaing.dev@gmail.com',
    href: 'mailto:waiyanmaing.dev@gmail.com',
  },
  {
    social: 'github',
    link: 'wymdev',
    href: 'https://github.com/wymdev',
  },
  {
    social: 'linkedin',
    link: 'Wai Yan Maing',
    href: 'https://www.linkedin.com/in/waiyanmaing-dev/',
  }
];

const ContactCode = () => {
  return (
    <div className={styles.code}>
      <p className={styles.line}>
        <span className={styles.className}>.socials</span> &#123;
      </p>
      {contactItems.slice(0, 8).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      {contactItems.slice(8, contactItems.length).map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      <p className={styles.line}>&#125;</p>
    </div>
  );
};

export default ContactCode;
