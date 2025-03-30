import styles from "@/styles/emergency.module.css";

const EmergencyHelp = () => {
  const contacts = [
    { service: "Ambulance", number: "102", icon: "🚑" },
    { service: "Fire Brigade", number: "101", icon: "🔥" },
    { service: "Police", number: "112", icon: "🚓" },
    { service: "Women Helpline", number: "1091", icon: "👩‍🦰" },
    { service: "Child Helpline", number: "1098", icon: "👶" },
    { service: "Disaster Management", number: "108", icon: "🌪️" },
    { service: "Mental Health Helpline", number: "1800-599-0019", icon: "🧠" },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🚨 Emergency Contact Numbers</h1>
      <p className={styles.description}>Quick access to essential emergency services.</p>

      <div className={styles.cardContainer}>
        {contacts.map((contact, index) => (
          <div key={index} className={styles.card}>
            <span className={styles.icon}>{contact.icon}</span>
            <h3 className={styles.cardTitle}>{contact.service}</h3>
            <p className={styles.cardNumber}>📞 {contact.number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyHelp;
