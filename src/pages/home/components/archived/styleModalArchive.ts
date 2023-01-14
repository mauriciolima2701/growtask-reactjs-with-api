import styled from "styled-components";

export const StyleModalArchive = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	min-width: 900px;
	max-width: 1124px;
	background-color: #ededed;
	border: 2px solid #13dfdc;
	border-radius: 15px;
	box-shadow: 0px 10px 26px 0px rgba(0, 0, 0, 1);
	padding: 10px;

	.cardArchived {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;
		max-width: 1124px;
		max-height: 550px;

		gap: 5px;
		overflow-y: auto;
	}

	.textTitleEdit {
		text-align: center;
		margin: 15px 0;
		font-size: 1.2rem;
		font-weight: 700;
	}

	@media (max-width: 700px) {
		width: 100%;
		height: 100%;
		padding: 15px;
		border-radius: 0px;

		.cardArchived {
			height: 100%;
			padding-bottom: 50px;
		}
	}

	@media (max-width: 900px) {
		flex-direction: column;
		min-width: 100%;
		align-items: center;
		justify-content: center;
	}

	@media (max-width: 400px) {
		.textTitleEdit {
			font-size: 0.9rem;
		}
	}
`;
