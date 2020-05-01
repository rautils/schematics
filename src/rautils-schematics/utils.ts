export function toKebabCase(str: string): string {
	return (
		str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) ?? []
	)
		.map((x) => x.toLowerCase())
		.join('-');
}

export function angularEntry(name: string): any {
	return {
		projectType: `library`,
			root: `projects/${name}`,
			sourceRoot: `projects/${name}/src`,
			prefix: `lib`,
			architect: {
				build: {
					builder: `@angular-devkit/build-ng-packagr:build`,
					options: {
						tsConfig: `projects/${name}/tsconfig.lib.json`,
						project: `projects/${name}/ng-package.json`
					},
					configurations: {
						production: {
							tsConfig: `projects/${name}/tsconfig.lib.prod.json`
						}
					}
				},
				test: {
					builder: `@angular-builders/jest:run`,
					options: {
						tsConfig: `projects/${name}/tsconfig.spec.json`
					}
				},
				lint: {
					builder: `@angular-devkit/build-angular:tslint`,
					options: {
						tsConfig: [
							`projects/${name}/tsconfig.lib.json`,
							`projects/${name}/tsconfig.spec.json`
						],
						exclude: [
							`**/node_modules/**`
						]
					}
				}
			}
	}
}
