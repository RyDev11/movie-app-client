import Banner from "../components/Banner";

import { Container } from "react-bootstrap";



export default function Home(){
	const data = {
		title: "Welcome to MovieHive",
		content: "Discover and explore a vast collection of movies!",
		destination: "/movies",
		buttonLabel: "Browse Movies"
	}

	return(
		<>	
			<Container className="mb-5">
			<Banner data={data} />

			</Container>
		</>
	)
}