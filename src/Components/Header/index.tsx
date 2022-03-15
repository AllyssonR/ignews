import Image from 'next/image'
import { SigninButton } from './SignInButton'
import styles from './styles.module.scss'
import { ActiveLink } from '../ActiveLink'
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
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SigninButton />
      </div>
    </header>
  )
}
