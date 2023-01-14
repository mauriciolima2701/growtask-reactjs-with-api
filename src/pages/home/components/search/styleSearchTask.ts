import styled from "styled-components";

const StyleSearchTask = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 10px;
	width: 50%;
	margin-right: 10%;
	/* background-color: green; */

	.searchTask {
		display: flex;
		justify-content: center;
		/* background-color: red; */
	}

	@media (max-width: 645px) {
		.css-13whraq-MuiInputBase-root .MuiInputBase-input {
			width: 6ch;
		}
	}

	@media (max-width: 745px) {
		margin-right: 2px;

		.btnSearch {
			padding: 1px 1px;
			min-width: 25px !important;
			display: inline;
			font-size: 0.7rem;
		}
	}
`;

export default StyleSearchTask;
