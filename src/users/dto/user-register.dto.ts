import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Wrong email' })
	email: string;

	@IsString({ message: 'No password' })
	password: string;

	@IsString({ message: 'No user name' })
	name: string;
}
