// Hypothesis API integration for Lectio
// Handles annotation synchronization with Hypothesis.is

interface HypothesisConfig {
  apiUrl: string;
  clientId?: string;
  apiKey?: string;
}

interface HypothesisAnnotation {
  id: string;
  created: string;
  updated: string;
  user: string;
  uri: string;
  text: string;
  tags: string[];
  target: Array<{
    source: string;
    selector: Array<{
      type: string;
      exact?: string;
      start?: number;
      end?: number;
      startContainer?: string;
      endContainer?: string;
    }>;
  }>;
  document?: {
    title?: string[];
  };
  group: string;
  references?: string[];
  permissions: {
    read: string[];
    admin: string[];
    update: string[];
    delete: string[];
  };
}

class HypothesisClient {
  private config: HypothesisConfig;

  constructor(config: HypothesisConfig) {
    this.config = {
      apiUrl: 'https://hypothes.is/api',
      ...config,
    };
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.config.apiUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.config.apiKey) {
      headers['Authorization'] = `Bearer ${this.config.apiKey}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Hypothesis API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Search annotations
  async searchAnnotations(params: {
    user?: string;
    group?: string;
    uri?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ rows: HypothesisAnnotation[]; total: number }> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });

    return this.request(`/search?${searchParams.toString()}`);
  }

  // Create annotation
  async createAnnotation(annotation: Partial<HypothesisAnnotation>): Promise<HypothesisAnnotation> {
    return this.request('/annotations', {
      method: 'POST',
      body: JSON.stringify(annotation),
    });
  }

  // Update annotation
  async updateAnnotation(id: string, annotation: Partial<HypothesisAnnotation>): Promise<HypothesisAnnotation> {
    return this.request(`/annotations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(annotation),
    });
  }

  // Delete annotation
  async deleteAnnotation(id: string): Promise<{ deleted: boolean; id: string }> {
    return this.request(`/annotations/${id}`, {
      method: 'DELETE',
    });
  }

  // Get annotation by ID
  async getAnnotation(id: string): Promise<HypothesisAnnotation> {
    return this.request(`/annotations/${id}`);
  }

  // Create group
  async createGroup(group: {
    name: string;
    description?: string;
    type?: 'private' | 'restricted';
  }): Promise<{ id: string; name: string; public: boolean }> {
    return this.request('/groups', {
      method: 'POST',
      body: JSON.stringify(group),
    });
  }

  // Get groups
  async getGroups(): Promise<Array<{ id: string; name: string; public: boolean }>> {
    return this.request('/groups');
  }
}

// Utility functions for converting between Lectio and Hypothesis formats
export function lectioToHypothesis(lectioAnnotation: {
  text: string;
  content: string;
  cfiRange?: string;
  pageNumber?: number;
  position?: any;
  bookId: string;
  userId: string;
  groupId?: string;
}): Partial<HypothesisAnnotation> {
  const target = {
    source: `lectio://book/${lectioAnnotation.bookId}`,
    selector: [] as any[],
  };

  // Add CFI selector for EPUB
  if (lectioAnnotation.cfiRange) {
    target.selector.push({
      type: 'CfiRangeSelector',
      cfiRange: lectioAnnotation.cfiRange,
    });
  }

  // Add page selector for PDF
  if (lectioAnnotation.pageNumber) {
    target.selector.push({
      type: 'PageSelector',
      page: lectioAnnotation.pageNumber,
    });
  }

  // Add text position selector
  target.selector.push({
    type: 'TextQuoteSelector',
    exact: lectioAnnotation.text,
  });

  return {
    text: lectioAnnotation.content,
    target: [target],
    tags: ['lectio'],
    group: lectioAnnotation.groupId || '__world__',
  };
}

export function hypothesisToLectio(hypothesisAnnotation: HypothesisAnnotation): {
  hypothesisId: string;
  text: string;
  content: string;
  cfiRange?: string;
  pageNumber?: number;
  position?: any;
  bookId?: string;
} {
  const target = hypothesisAnnotation.target[0];
  const bookId = target?.source?.replace('lectio://book/', '') || undefined;

  let cfiRange: string | undefined;
  let pageNumber: number | undefined;
  let text = '';

  target?.selector?.forEach((selector) => {
    switch (selector.type) {
      case 'CfiRangeSelector':
        cfiRange = selector.exact;
        break;
      case 'PageSelector':
        pageNumber = selector.start;
        break;
      case 'TextQuoteSelector':
        text = selector.exact || '';
        break;
    }
  });

  return {
    hypothesisId: hypothesisAnnotation.id,
    text,
    content: hypothesisAnnotation.text,
    cfiRange,
    pageNumber,
    bookId,
    position: target,
  };
}

export default HypothesisClient;