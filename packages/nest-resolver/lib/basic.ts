import { Module } from '@nestjs/core/injector/module';
import { isEmpty } from 'lodash';
export class BaseExplorerService {
    getModules(
        modulesContainer: Map<string, Module>,
        include: Function[],
    ): Module[] {
        if (!include || isEmpty(include)) {
            return [...modulesContainer.values()];
        }
        const whitelisted = this.includeWhitelisted(modulesContainer, include);
        return whitelisted;
    }

    includeWhitelisted(
        modulesContainer: Map<string, Module>,
        include: Function[],
    ): Module[] {
        return [...modulesContainer.values()].filter(({ metatype }) =>
            include.some(item => item === metatype),
        );
    }
}
