import React from 'react';
import { shallow } from 'enzyme';
import _debounce from 'lodash/debounce';

import tmdbClient from '../../utils/tmdbClient';

import Catalogue from './Catalogue';
import Listing from './Listing';
import Search from './Search';

jest.mock('lodash/debounce');
jest.mock('../../utils/tmdbClient');

// don't show PropTypes validation error in CLI during the tests
Listing.propTypes = {};
Search.propTypes = {};

describe('yo-fe/src/app/components/Catalogue', () => {
  let config;

  beforeEach(() => {
    config = {
      apiUrl: '__API_URL__',
      apiKey: '__API_KEY__',
    };
  });

  describe('constructor', () => {
    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should create tmdbClient', () => {
      const tmdbClientInstance = Symbol('tmdbClient');

      tmdbClient.mockReturnValueOnce(tmdbClientInstance);

      const wrapper = shallow(<Catalogue config={config} />);

      expect(tmdbClient).toHaveBeenCalledTimes(1);
      expect(wrapper.instance().tmdbClient).toBe(tmdbClientInstance);
    });

    it('should debounce searchMovies handler', () => {
      const _debounceResults = Symbol('_debounceResults');
      _debounce.mockReturnValueOnce(_debounceResults);

      const wrapper = shallow(<Catalogue config={config} />);

      expect(wrapper.instance().searchMoviesDebounced).toBe(_debounceResults);
    });

    it('should set init state', () => {
      const wrapper = shallow(<Catalogue config={config} />);

      expect(wrapper.state()).toEqual({
        fetching: false,
        queryString: '',
        movies: null,
        searchPagesLoaded: 0,
        searchPagesTotal: 0,
      });
    });
  });

  describe('updateQueryString', () => {
    it('should update state with new query string', () => {
      const wrapper = shallow(<Catalogue config={config} />);

      wrapper.instance().updateQueryString('shining');

      expect(wrapper.state('queryString')).toBe('shining');
    });
  });

  describe('searchMovies', () => {
    let mockTmdbClientSearchMovies;

    beforeEach(() => {
      mockTmdbClientSearchMovies = jest.fn(() => ({}));

      tmdbClient.mockReturnValue({
        searchMovies: mockTmdbClientSearchMovies,
      });
    });

    describe('queryString is not empty', () => {
      it('should set state fetching to true first', async () => {
        const wrapper = shallow(<Catalogue config={config} />);
        wrapper.instance().setState = jest.fn();
        await wrapper.instance().searchMovies('pulp fiction');

        expect(wrapper.instance().setState.mock.calls[0][0]).toEqual({ fetching: true });
      });

      it('should call tmdbClient.searchMovies with queryString value from the state', async () => {
        const wrapper = shallow(<Catalogue config={config} />);

        await wrapper.instance().searchMovies('pulp fiction');

        expect(mockTmdbClientSearchMovies).toHaveBeenCalledTimes(1);
        expect(mockTmdbClientSearchMovies).toHaveBeenCalledWith({ query: 'pulp fiction' });
      });

      it('should update state with new data', async () => {
        mockTmdbClientSearchMovies.mockReturnValueOnce({
          results: ['movies'],
          total_pages: 23,
          page: 1,
        });

        const wrapper = shallow(<Catalogue config={config} />);

        await wrapper.instance().searchMovies('pulp fiction');

        expect(wrapper.state()).toEqual(expect.objectContaining({
          fetching: false,
          movies: ['movies'],
          searchPagesLoaded: 1,
          searchPagesTotal: 23,
        }));
      });
    });

    describe('queryString is empty', () => {
      it('should not call tmdbClient.searchMovies', async () => {
        const wrapper = shallow(<Catalogue config={config} />);

        await wrapper.instance().searchMovies('');

        expect(mockTmdbClientSearchMovies).not.toHaveBeenCalled();
      });

      it('should set correct state', async () => {
        const wrapper = shallow(<Catalogue config={config} />);

        await wrapper.instance().searchMovies('');

        expect(wrapper.state()).toEqual(expect.objectContaining({
          fetching: false,
          movies: null,
          searchPagesLoaded: 0,
          searchPagesTotal: 0,
        }));
      });
    });
  });

  describe('loadNextPage', () => {
    let mockTmdbClientSearchMovies;

    beforeEach(() => {
      mockTmdbClientSearchMovies = jest.fn(() => ({}));

      tmdbClient.mockReturnValue({
        searchMovies: mockTmdbClientSearchMovies,
      });
    });

    describe('state.queryString is empty', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = shallow(<Catalogue config={config} />);

        wrapper.setState({ queryString: '' });
      });

      it('should not call tmdbClient.searchMovies', async () => {
        await wrapper.instance().loadNextPage();

        expect(mockTmdbClientSearchMovies).not.toHaveBeenCalled();
      });

      it('should not call setState', async () => {
        wrapper.instance().setState = jest.fn();

        await wrapper.instance().loadNextPage();

        expect(wrapper.instance().setState).not.toHaveBeenCalled();
      });
    });

    describe('state.queryString is not empty', () => {
      describe('all API search results pages are already loaded', () => {
        let wrapper;

        beforeEach(() => {
          wrapper = shallow(<Catalogue config={config} />);

          wrapper.setState({
            queryString: 'scarface',
            searchPagesLoaded: 23,
            searchPagesTotal: 23,
          });
        });

        it('should not call tmdbClient.searchMovies', async () => {
          await wrapper.instance().loadNextPage();

          expect(mockTmdbClientSearchMovies).not.toHaveBeenCalled();
        });

        it('should not call setState', async () => {
          wrapper.instance().setState = jest.fn();

          await wrapper.instance().loadNextPage();

          expect(wrapper.instance().setState).not.toHaveBeenCalled();
        });
      });

      describe('not all API search results pages are already loaded', () => {
        let wrapper;

        beforeEach(() => {
          mockTmdbClientSearchMovies.mockResolvedValueOnce({
            results: ['movies', 'second', 'page'],
            page: 2,
          });

          wrapper = shallow(<Catalogue config={config} />);

          wrapper.setState({
            queryString: 'scarface',
            searchPagesLoaded: 1,
            searchPagesTotal: 23,
            movies: ['movies', 'first', 'page'],
          });
        });

        it('should call tmdbClient.searchMovies with correct parameters', async () => {
          await wrapper.instance().loadNextPage();

          expect(mockTmdbClientSearchMovies).toHaveBeenCalledWith({ query: 'scarface', page: 2 });
        });

        it('should set correct new state', async () => {
          await wrapper.instance().loadNextPage();

          expect(wrapper.instance().state).toEqual(expect.objectContaining({
            movies: ['movies', 'first', 'page', 'movies', 'second', 'page'],
            searchPagesLoaded: 2,
          }));
        });
      });
    });
  });

  describe('render', () => {
    it('should render Search', () => {
      const wrapper = shallow(<Catalogue config={config} />);

      expect(wrapper.find(Search)).toHaveLength(1);
    });

    it('should render Search with correct updateQueryString prop', async () => {
      const wrapper = shallow(<Catalogue config={config} />);

      expect(wrapper.find(Search).at(0).prop('updateQueryString'))
        .toBe(wrapper.instance().updateQueryString);
    });

    it('should render Search with correct searchHandler prop', async () => {
      const wrapper = shallow(<Catalogue config={config} />);

      expect(wrapper.find(Search).at(0).prop('searchHandler'))
        .toBe(wrapper.instance().searchMoviesDebounced);
    });

    it('should render Search with state.queryString as queryString prop', async () => {
      const wrapper = shallow(<Catalogue config={config} />);
      wrapper.setState({
        queryString: 'napoleon dynamite',
      });

      expect(wrapper.find(Search).at(0).prop('queryString'))
        .toBe('napoleon dynamite');
    });

    it('should render Listing', async () => {
      const wrapper = shallow(<Catalogue config={config} />);

      expect(wrapper.find(Listing)).toHaveLength(1);
      expect(wrapper.find(Listing).at(0).prop('loadMoreHandler'))
        .toBe(wrapper.instance().loadNextPage);
    });

    it('should render Listing with correct loadMoreHandler prop', async () => {
      const wrapper = shallow(<Catalogue config={config} />);

      expect(wrapper.find(Listing).at(0).prop('loadMoreHandler'))
        .toBe(wrapper.instance().loadNextPage);
    });

    it('should render Listing with state.movies as results prop', async () => {
      const wrapper = shallow(<Catalogue config={config} />);

      wrapper.setState({ movies: ['movies'] });

      expect(wrapper.find(Listing).at(0).prop('results'))
        .toEqual(['movies']);
    });

    it('should render Listing with state.fetching as fetching prop', async () => {
      const wrapper = shallow(<Catalogue config={config} />);

      wrapper.setState({ fetching: 'fetching prop' });

      expect(wrapper.find(Listing).at(0).prop('fetching'))
        .toEqual('fetching prop');
    });
  });
});
