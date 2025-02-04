import { globalStyles } from "../globalStyles";

export default function Footer() {
    return (
        <footer style={styles.container}>
            <p>&copy; 2025 Wired International. All rights reserved.</p>
        </footer>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        backgroundColor: globalStyles.colors.headerColor,
        color: globalStyles.colors.whiteTheme,
        padding: '10px',
        textAlign: 'center',
        marginTop: 'auto',
        borderTop: `3px solid ${globalStyles.colors.whiteTheme}`,
        fontFamily: 'Arial, sans-serif',
      },
}