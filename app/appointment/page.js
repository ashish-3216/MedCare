import Doctor_card from '@/Components/Doctor_card'
import styles from '@/styles/appointment.module.css'
import React from 'react'
/*image_url , Name , role , experience , rating*/
const page = () => {
  return (
    <div className={styles.doctor_grid}>
      <Doctor_card image_url={'./Frame.svg'} Name={'Tony Stark ,MDS'} role={'Dentist'} experience={'4 Years'} rating={'5'}/>
      <Doctor_card image_url={'./Frame.svg'} Name={'Tony Stark ,MDS'} role={'Dentist'} experience={'4 Years'} rating={'5'}/>
      <Doctor_card image_url={'./Frame.svg'} Name={'Tony Stark ,MDS'} role={'Dentist'} experience={'4 Years'} rating={'5'}/>
      <Doctor_card image_url={'./Frame.svg'} Name={'Tony Stark ,MDS'} role={'Dentist'} experience={'4 Years'} rating={'5'}/>
      <Doctor_card image_url={'./Frame.svg'} Name={'Tony Stark ,MDS'} role={'Dentist'} experience={'4 Years'} rating={'5'}/>
      <Doctor_card image_url={'./Frame.svg'} Name={'Tony Stark ,MDS'} role={'Dentist'} experience={'4 Years'} rating={'5'}/>
    </div>
  )
}

export default page
