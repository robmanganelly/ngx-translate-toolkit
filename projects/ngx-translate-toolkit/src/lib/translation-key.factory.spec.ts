import { describe, expect, it } from 'vitest';

import {
  tagAtIndex,
  tagsAtRange,
  tagFactory,
  componentPath,
  servicePath,
  directivePath,
  resolverPath,
  routePath,
  pipePath,
  customPath,
  pathFactory,
  singletonPath,
  storePath,
  guardPath,
} from './translation-key.factory';

describe('tagAtIndex', () => {
  it('should return the correct tag for a given index', () => {
    const t = ['tag1', 'tag2', 'tag3'];
    const tags = tagFactory('foo', t);
    expect(tagAtIndex(tags, 1)).toBe('foo.tag2');
    expect(tagAtIndex(tags, 0)).toBe('foo.tag1');
    expect(tagAtIndex(tags, 2)).toBe('foo.tag3');
    expect(tagAtIndex(tags, 3)).toBe(''); // out of bounds
  });
});

describe('tagsAtRange', () => {
  it('should return the correct tags for a given range', () => {
    const t = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'];
    const tags = tagFactory('foo', t);
    expect(tagsAtRange(tags, 0, 2)).toEqual(['foo.tag1', 'foo.tag2']);
    expect(tagsAtRange(tags, 1, 3)).toEqual(['foo.tag2', 'foo.tag3']);
    expect(tagsAtRange(tags, 3)).toEqual(['foo.tag4', 'foo.tag5']);
  });
});

describe('tagFactory', () => {
  it('should create tags with the correct prefix', () => {
    const t = ['tag1', 'tag2', 'tag3'];
    const tags = tagFactory('foo', t);
    expect(tags.keys).toEqual(t);
    expect(tags.path).toEqual('foo');
    expect(tags.tags).toEqual({
      tag1: 'foo.tag1',
      tag2: 'foo.tag2',
      tag3: 'foo.tag3',
    });
  });
});

describe('componentPath', () => {
  it('should return the proper path', () => {
    expect(componentPath('foo', 'home')).toBe('foo.components.home');
  });
});
describe('servicePath', () => {
  it('should return the proper path', () => {
    expect(servicePath('foo', 'user')).toBe('foo.services.user');
  });
});
describe('directivePath', () => {
  it('should return the proper path', () => {
    expect(directivePath('foo', 'highlight')).toBe('foo.directives.highlight');
  });
});
describe('pipePath', () => {
  it('should return the proper path', () => {
    expect(pipePath('foo', 'date')).toBe('foo.pipes.date');
  });
});
describe('resolverPath', () => {
  it('should return the proper path', () => {
    expect(resolverPath('foo', 'user')).toBe('foo.resolvers.user');
  });
});
describe('guardPath', () => {
  it('should return the proper path', () => {
    expect(guardPath('foo', 'auth')).toBe('foo.guards.auth');
  });
});
describe('storePath', () => {
  it('should return the proper path', () => {
    expect(storePath('foo', 'user')).toBe('foo.stores.user');
  });
});
describe('routePath', () => {
  it('should return the proper path', () => {
    expect(routePath('foo', 'userProfile')).toBe('foo.routes.userProfile');
  });
});
describe('customPath', () => {
  it('should return the proper path', () => {
    expect(customPath('foo', 'feature', 'item')).toBe('foo.feature.item');
  });
});
describe('singletonPath', () => {
  it('should return the proper path', () => {
    expect(singletonPath('foo')).toBe('foo.components.foo');
  });
});


describe('pathFactory', () => {
  it('should create path helpers for various entities', () => {
    const paths = pathFactory('myLib');
    expect(paths.component('home')).toBe('myLib.components.home');
    expect(paths.service('user')).toBe('myLib.services.user');
    expect(paths.directive('highlight')).toBe('myLib.directives.highlight');
    expect(paths.pipe('date')).toBe('myLib.pipes.date');
    expect(paths.resolver('user')).toBe('myLib.resolvers.user');
    expect(paths.guard('auth')).toBe('myLib.guards.auth');
    expect(paths.store('user')).toBe('myLib.stores.user');
    expect(paths.route('userProfile')).toBe('myLib.routes.userProfile');
  });
})
