interface ResultItemDetails {
  author: {
    name: string;
    url: string;
  };
  date: string;
  description: string;
  keywords: string[];
  links: {
    npm: string;
    homepage: string;
    repository: string;
    bugs: string;
  };
  maintainers: {
    username: string;
    email: string;
  }[];
  name: string;
  publisher: {
    username: string;
    email: string;
  };
  scope: string;
  version: string;
}

interface ResultItem {
  package: ResultItemDetails;
  score: {
    final: number;
    detail: {
      quality: number;
      popularity: number;
      maintenance: number;
    };
  };
  searchScore: number;
}

interface ResultsResponse {
  results: ResultItem[];
  total: number;
}

interface SearchParams {
  searchText: string;
  searchSize?: number;
  searchFrom?: number;
}

export { ResultsResponse, ResultItemDetails, ResultItem, SearchParams };
