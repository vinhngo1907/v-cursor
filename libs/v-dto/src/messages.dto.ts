export type messageAnalysisDto = {
	spam?: boolean;
	toxic?: boolean;
	severe_toxic?: boolean;
	obscene?: boolean;
	threat?: boolean;
	insult?: boolean;
	identity_hate?: boolean;
};

export type messageDto = {
	id?: string;
	uuid: string;
	message: string;
	room_id: string;
	user_id: string;
	created_at?: Date;
	analysis?: messageAnalysisDto;
};