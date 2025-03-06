import "./About.scss"

function About() {
    return (
        <div>
            <h2>О сайте</h2>
            <div>
                Сайт является учебным пет-проектом.
            </div>
            <div>
                Разработчик: Студент ЮУрГУ Хисматуллин В.В. ЕТ-312 Прикладная математика и информатика 2024
            </div>

            <h2>GitHub</h2>
            <div>
                <div className="git-hub-info">
                    <a href="https://github.com/XTrau" target="_blank">
                        <img width={75} height={75} src="/GitHub.png" alt=""/>
                    </a>
                    <span>
						<div>
							<a href="https://github.com/XTrau/Audio-player-frontend"
                               target="_blank">Frontend repository</a>
						</div>
						<div>
							<a href="https://github.com/XTrau/Audio-player-backend"
                               target="_blank">Backend repository</a>
						</div>
					</span>
                </div>
            </div>
        </div>
    );
}

export default About;