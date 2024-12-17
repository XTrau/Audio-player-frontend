import "./Album.scss"

import React, { useEffect, useRef, useState } from 'react';
import { FileService } from "../../services/fileService.js";
import { Link } from "react-router-dom";

function Album({id, title, image_file_name, track_count, key}) {
	const containerRef = useRef(null);
	const textRef = useRef(null);
	const [isScrollable, setIsScrollable] = useState(false);

	useEffect(() => {
		if (containerRef.current && textRef.current) {
			const isOverflowing = textRef.current.scrollWidth > containerRef.current.offsetWidth;
			setIsScrollable(isOverflowing);
		}
	}, [title]);

	console.log(track_count)

	return (
		<Link to={`/album/${id}`}>
			<div className="album-wrapper" key={key}>
				<div className="album-content">
					<img width={150} height={150}
							 src={FileService.getUrlToFile(image_file_name) || FileService.getDefaultImageUrl()} alt={""}/>
					<div className="album-description" ref={containerRef}>
						<div className={`album-title ${isScrollable ? "scroll-text" : ""}`} ref={textRef}>
							{title}
						</div>
						<div className="album-status">{track_count === 1 ? "Сингл" : "Альбом"}</div>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default Album;