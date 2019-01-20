import getTmdbImageLink from './getTmdbImageLink';

describe('yo-fe/src/app/utils/getTmdbImageLink', () => {
  it('should create correct link', () => {
    const baseUrl = '__BASE_URL__';
    const width = '__WIDTH__';
    const image = '__IMAGE_PATH__';

    expect(getTmdbImageLink({ image, baseUrl, width })).toBe('__BASE_URL__/__WIDTH____IMAGE_PATH__');
  });
});
