import { createContainer, InjectionMode, Lifetime } from "awilix";
import { PrismaUserRepository } from "./core/repositories";

const container = createContainer({
    injectionMode: InjectionMode.PROXY,
    strict: true,
})

export interface RequestContainer {
    PrismaUserRepository: PrismaUserRepository;
}

// Repositories
container.loadModules(
    [
        `core/repositories/implementations/**/*.js`,
    ],
    {
        cwd: __dirname,
        formatName: (name, descriptor) => {
            const isWin = descriptor.path.includes('\\');
            const splat = descriptor.path.split(isWin ? '\\' : '/')
            const namespace = splat[splat.length - 2]
            const upperNamespace = namespace.charAt(0) + namespace.substring(1)
            return upperNamespace + name
        },
        resolverOptions: {
            lifetime: Lifetime.SINGLETON,
        },
    }
);

// Services
container.loadModules(
    [
        'core/services/**/*.js',
    ],
    {
        cwd: __dirname,
        formatName: 'camelCase',
        resolverOptions: {
            lifetime: Lifetime.SINGLETON,
        },
    }
);

// Controllers and Usecases
container.loadModules(
    [
        'core/modules/**/*.js',
    ],
    {
        cwd: __dirname,
        formatName: (name, descriptor) => {
            const isWin = descriptor.path.includes('\\');
            const splat = descriptor.path.split(isWin ? '\\' : '/');
            let entityNamespace = splat[splat.length - 3];
            entityNamespace = entityNamespace.charAt(0).toLowerCase() + entityNamespace.substring(1);
            let actionNamespace = splat[splat.length - 2];
            actionNamespace = actionNamespace.charAt(0).toUpperCase() + actionNamespace.substring(1);
            name = name.charAt(0).toUpperCase() + name.substring(1);
            return entityNamespace + actionNamespace + name;
        },
        resolverOptions: {
            lifetime: Lifetime.SINGLETON,
        },
    }
);

console.log('Modules loaded:', Object.keys(container.registrations));

export default container;