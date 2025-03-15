import React from 'react'
import styles from '@/styles/footer.module.css'
const Footer = () => {
  return (
    <div className={styles.container}>
      <p className={styles.company}>© EmScripts 2024. All Right Reserved.</p>
      <div className={styles.social}>
        <img src='/Phone.svg'></img>
        <img src='/Whatsapp.svg'></img>
      </div>
    </div>
  )
}

export default Footer
