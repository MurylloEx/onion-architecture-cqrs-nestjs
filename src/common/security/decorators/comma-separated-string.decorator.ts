import { Matches } from 'class-validator';

export const IsCommaSeparatedString = () => Matches(new RegExp(/^[0-9a-z_]+(,[0-9a-z_]+)*$/));
