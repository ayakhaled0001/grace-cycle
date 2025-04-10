import styles from "./LocalLoader.module.css";
function LocalLoader() {
  return (
    <div>
      <div className={styles.loader}>
        <img src="public/solidGraceCycleLogo.svg" alt="" />
      </div>
    </div>
  );
}

export default LocalLoader;
