import { describe, it, expect } from 'vitest';
import app from '../../index';

describe('Health API', () => {
  it('should return 200 status with ok response', async () => {
    const res = await app.request('/api/health');
    expect(res.status).toBe(200);

    const data = await res.json() as { status: string };
    expect(data.status).toBe('ok');
  });
});