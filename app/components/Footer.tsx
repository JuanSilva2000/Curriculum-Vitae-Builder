import { Github } from "lucide-react"

const Footer = () => {
    return (
        <footer
            className="flex items-center justify-center h-7 bg-black text-white gap-2 mt-2"
        >
            Created by Juan Silva
            <a href="https://github.com/JuanSilva2000" target="_blank" rel="noopener noreferrer">
                <Github />
            </a>
        </footer>
    )
}

export default Footer