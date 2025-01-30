
export default function Footer() {
    return (
        <footer style={styles.container}>
            <p>&copy; 2025 Wired International. All rights reserved.</p>
        </footer>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        backgroundColor: '#508432',
        color: '#fff',
        padding: '10px',
        textAlign: 'center',
        marginTop: 'auto',
        borderTop: '3px solid #fff',
        fontFamily: 'Arial, sans-serif',
      },
}