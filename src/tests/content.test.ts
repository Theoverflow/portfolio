import { describe, expect, it } from 'vitest';

import { listAllTags } from '../content/utils';

describe('listAllTags', () => {
  it('deduplicates and sorts tags', () => {
    const items = [
      { meta: { tags: ['B', 'A'] } },
      { meta: { tags: ['A', 'C'] } }
    ];

    expect(listAllTags(items)).toEqual(['A', 'B', 'C']);
  });
});
