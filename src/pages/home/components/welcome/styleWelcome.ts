import styled from "styled-components";

export const StyleWelcome = styled.h1`
	display: block;
	font-size: 2.5rem;
	color: aqua;
	margin-bottom: 20px;
	text-align: center;
	margin-top: 80px;

	span {
		color: #08a1e4;
	}

	@media (max-width: 750px) {
		font-size: 1.5rem;
		margin-top: 120px;
	}
`;
