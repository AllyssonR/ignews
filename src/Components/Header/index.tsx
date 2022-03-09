import Image from 'next/image'
import { SigninButton } from './SignInButton'
import styles from './styles.module.scss'
export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src="/images/logo.svg"
          width={108.45}
          height={30.27}
          alt="ig.news"
        />
        <nav>
          <a className={styles.active}>Home</a>
          <a>Posts</a>
        </nav>
        <SigninButton />
      </div>
    </header>
  )
}
