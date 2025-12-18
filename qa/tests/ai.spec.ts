import { test, expect } from '@playwright/test';
import { aiHealth, aiRecommend } from './helpers/api';

test.describe('AI Agent API Tests', () => {
  test.describe('Health Check', () => {
    test('should return operational status', async () => {
      // Make request to AI health endpoint
      const healthData = await aiHealth();

      // Skip test if AI backend is not available locally
      if (healthData === null) {
        test.skip('AI backend not available locally');
      }

      // Verify status is operational
      expect(healthData.status).toBe('operational');

      // Verify required capabilities are present
      expect(healthData.capabilities).toContain('university_recommendations');
      expect(healthData.capabilities).toContain('university_comparison');
      expect(healthData.capabilities).toContain('context_tracking');
      expect(healthData.capabilities).toContain('personalized_advice');

      // Verify required fields are present
      expect(healthData).toHaveProperty('context7_enabled');
      expect(healthData).toHaveProperty('anthropic_configured');
      expect(healthData).toHaveProperty('model');
    });
  });

  test.describe('Recommendations', () => {
    test('should successfully generate university recommendations', async () => {
      // Test data for recommendation request
      const recommendationRequest = {
        session_id: 'test-session-123',
        query: 'I want to study Computer Science',
        user_score: 1400,
        preferred_country: 'USA',
        preferred_specialty: 'Computer Science'
      };

      // Make POST request to AI recommend endpoint
      const recommendationData = await aiRecommend(recommendationRequest);

      // Skip test if AI backend is not available locally
      if (recommendationData === null) {
        test.skip('AI backend not available locally');
      }

      // Verify success field is true
      expect(recommendationData.success).toBe(true);

      // Verify required fields are present (but don't check content)
      expect(recommendationData).toHaveProperty('recommendations');
      expect(recommendationData).toHaveProperty('session_id');
      expect(recommendationData.session_id).toBe('test-session-123');
    });
  });
});
