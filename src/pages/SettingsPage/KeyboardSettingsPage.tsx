import './styles.scss'

interface KeyboardSettingsPageProps {}

const KeyboardSettingsPage = (props: KeyboardSettingsPageProps) => {
  return (
    <div className="settings__main">
      <h1>Keyboard</h1>
      <p
        style={{
          fontSize: '1rem',
          fontWeight: 500,
        }}>
        Coming soon!
      </p>
    </div>
  )
}

export default KeyboardSettingsPage
