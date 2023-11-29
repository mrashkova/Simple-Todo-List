import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Created and designed by Mariya Rashkova</p>
      <div className={styles.footerSocial}>
        <a href="https://www.linkedin.com/in/mrashkova/">
          <i className="fa fa-linkedin"></i>
        </a>
        <a href="https://github.com/mrashkova">
          <i className="fa fa-github"></i>
        </a>
      </div>
    </footer>
  );
}
