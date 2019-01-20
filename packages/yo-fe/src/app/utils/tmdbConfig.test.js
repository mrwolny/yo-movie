import tmdbConfig from './tmdbConfig';

describe('yo-fe/src/app/utils/tmdbClient', () => {
  it('should be a function', () => {
    expect(tmdbConfig).toBeInstanceOf(Function);
  });

  describe('isValidPosterSize', () => {
    it('should return true for poster size available in posters sizes array', () => {
      const config = {
        images: {
          poster_sizes: [
            'size',
          ],
        },
      };

      expect(tmdbConfig(config).isValidPosterSize('size')).toBe(true);
    });

    it('should return false if no poster size found in available poster sizes array', () => {
      const config = {
        images: {
          poster_sizes: [
            'size',
          ],
        },
      };

      expect(tmdbConfig(config).isValidPosterSize('not a size')).toBe(false);
    });
  });

  describe('getPosterSizes', () => {
    it('should return poster sizes array', () => {
      const config = {
        images: {
          poster_sizes: [
            'size',
          ],
        },
      };

      expect(tmdbConfig(config).getPosterSizes()).toEqual(['size']);
    });
  });

  describe('getImageBaseUrl', () => {
    it('should return poster sizes array', () => {
      const config = {
        images: {
          secure_base_url: 'https://images.url',
        },
      };

      expect(tmdbConfig(config).getImageBaseUrl()).toBe('https://images.url');
    });
  });
});
