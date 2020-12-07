import bcrypt from 'bcryptjs';

const USERS =
	[
		{
			name: "qqqqq",
			id: "STAFF001",
			password: bcrypt.hashSync('welcome123', 10),
			isadmin: true,
		},
		{
			name: 'aaaaa',
			id: 'STAFF002',
			password: bcrypt.hashSync('welcome123', 10),
			isadmin: true,
		},
		{
			name: 'bbbb',
			id: 'STAFF003',
			password: bcrypt.hashSync('welcome123', 10),
			isadmin: false,
		},
		{
			name: 'zzz',
			id: 'STAFF008',
			password: bcrypt.hashSync('welcome123', 10),
			isadmin: false,
		},
		{
			name: 'qq',
			id: 'STAFF005',
			password: bcrypt.hashSync('welcome123', 10),
			isadmin: false,
		},
		{
			name: 'nnn',
			id: 'STAFF004',
			password: bcrypt.hashSync('welcome123', 10),
			isadmin: false,
		},
	];

export default USERS;