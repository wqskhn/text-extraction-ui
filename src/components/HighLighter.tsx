import _ from "lodash";
import React from "react";
import { Fragment } from "react";
import { LabelColor } from "../models/LabelColor";
import { splitString, compareString } from "../utils/util";
interface HighLighterProp {
	text: string;
	highlight: string;
	labelColor?: LabelColor;
}
const Highlighted = (props: HighLighterProp) => {
	const { text, highlight, labelColor } = props;

	if (!highlight.trim()) {
		return (
			<div style={{ whiteSpace: "pre-wrap" }}>
				<span>{text}</span>
			</div>
		);
	}

	const parts = splitString(text, highlight);
	return (
		<Fragment>
			<div style={{ whiteSpace: "pre-wrap" }}>
				{parts.map((part, i) =>
					compareString(part, highlight) ? (
						<mark
							style={{
								color: labelColor?.text_color,
								background: labelColor?.background_color,
							}}
							key={i}
						>
							{part}
						</mark>
					) : (
						<span key={i}>{part}</span>
					)
				)}
			</div>
		</Fragment>
	);
};
export default Highlighted;
