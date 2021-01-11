import './styles.css'

interface AppHeaderProps {
    title: string;
}

function AppHeader({title}: AppHeaderProps) {

    return (
        <header className="app-header">
            <h1>{title}</h1>
            <hr />
        </header>
    )
}

export default AppHeader