import {
	Rule,
	SchematicContext,
	Tree,
	url,
	apply,
	mergeWith,
	template,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { Schema } from './schema';
import { toKebabCase, angularEntry } from './utils';

function kebabWithNgxPrefix(kebab: string, context: SchematicContext): string {
	// Checks the case ngxname-name -> ngx-name-name
	if (kebab.substr(0, 3) === 'ngx') {
		context.logger.warn(
			`"ngx" has been set as a prefix "${kebab}" -> "ngx-${kebab.substr(3)}"`
		);
		return `ngx-${kebab.substr(3)}`;
	}

	context.logger.warn(`Added ngx prefix. To disable this set --forceNgxPrefix=false`);
	context.logger.warn(`Added "ngx" prefix "${kebab}" -> "ngx-${kebab}"`);

	return `ngx-${kebab}`;
}

function toNgxKebabCase(
	str: string,
	context: SchematicContext,
	forceNgxPrefix = true
): string {
	const kebab = toKebabCase(str);

	if (kebab !== str) {
		context.logger.warn(`Name should be in kebab-case`);

		context.logger.warn(`Parsed name to kebab-case "${str}" -> "${kebab}"`, {
			provided: str,
			kebab,
		});
	}

	const addPrefix = forceNgxPrefix && kebab.substr(0, 4) !== 'ngx-';

	return addPrefix ? kebabWithNgxPrefix(kebab, context) : kebab;
}

function parseName(
	rawName: string,
	context: SchematicContext,
	forceNgxPrefix = true
): string {
	if (!rawName) {
		throw `No name provided.`;
	}

	const kebab = toNgxKebabCase(rawName, context, forceNgxPrefix);

	return kebab;
}

export function rautility(options: Schema): Rule {
	return (_tree: Tree, _context: SchematicContext) => {
		if (!_tree.exists('angular.json')) {
			_context.logger.error('This must be run in an angular environtment');
			return;
		}

		const name = parseName(options.name, _context, options.forceNgxPrefix);
		const organization = options.organization;

		const angularStr = _tree.read('angular.json')!.toString('utf-8');
		const angular = JSON.parse(angularStr);
		angular['projects'] = {
			...angular['projects'],
			[`@${organization}/${name}`]: angularEntry(name),
		};
		_tree.overwrite('angular.json', JSON.stringify(angular, null, '\t'));

		const sourceTemplates = url(`./files`);

		const sourceParametrizedTemplates = apply(sourceTemplates, [
			template({
				...options,
				name,
				...strings,
			}),
		]);

		return mergeWith(sourceParametrizedTemplates);
	};
}
