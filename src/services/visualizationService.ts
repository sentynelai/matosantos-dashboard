import { ChartData } from 'chart.js';

interface ParsedData {
  type: 'sales' | 'comparison' | 'trend' | 'distribution' | 'radar' | 'gauge' | 'mixed';
  title: string;
  description: string;
  data: any;
  isDummy: boolean;
}

export class VisualizationService {
  private static validateOpenAIResponse(response: string): { isValid: boolean; isDummy: boolean } {
    const noDataIndicators = [
      'no data',
      'no information',
      'no trained',
      'cannot provide',
      'don\'t have',
      'do not have',
      'unavailable'
    ];

    const hasNoData = noDataIndicators.some(indicator => 
      response.toLowerCase().includes(indicator)
    );

    const isDummy = response.toLowerCase().includes('dummy') || 
                   response.toLowerCase().includes('sample') ||
                   response.toLowerCase().includes('example') ||
                   hasNoData;

    return {
      isValid: !hasNoData || isDummy,
      isDummy
    };
  }

  private static extractNumbers(text: string): number[] {
    return text.match(/\d+(?:\.\d+)?/g)?.map(Number) || [];
  }

  private static detectDataType(text: string): ParsedData['type'] {
    const keywords = {
      sales: ['sales', 'revenue', 'profit', 'income'],
      comparison: ['compare', 'versus', 'vs', 'against'],
      trend: ['trend', 'growth', 'increase', 'decrease'],
      distribution: ['distribution', 'breakdown', 'composition', 'share'],
      radar: ['performance', 'metrics', 'attributes', 'factors'],
      gauge: ['progress', 'goal', 'target', 'achievement'],
      mixed: ['overview', 'dashboard', 'summary', 'analysis']
    };

    const textLower = text.toLowerCase();
    for (const [type, words] of Object.entries(keywords)) {
      if (words.some(word => textLower.includes(word))) {
        return type as ParsedData['type'];
      }
    }

    return 'mixed';
  }

  static parseOpenAIResponse(response: string): ParsedData {
    const { isValid, isDummy } = this.validateOpenAIResponse(response);

    if (!isValid && !isDummy) {
      throw new Error('No trained data available for this request. Would you like to see a demo visualization instead?');
    }

    const title = response.split('\n')[0].replace(/^[#\s]+/, '') || 'Data Analysis';
    const type = this.detectDataType(response);
    const numbers = this.extractNumbers(response);
    const data = this.createDataStructure(type, numbers);

    return {
      type,
      title,
      description: response.split('\n')[1] || '',
      data,
      isDummy
    };
  }

  private static createDataStructure(type: ParsedData['type'], numbers: number[]): any {
    const defaultNumbers = Array.from({ length: 12 }, () => 
      Math.floor(Math.random() * 100)
    );
    
    const data = numbers.length > 0 ? numbers : defaultNumbers;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    switch (type) {
      case 'radar':
        return {
          labels: ['Revenue', 'Growth', 'Satisfaction', 'Retention', 'Engagement', 'Innovation'],
          datasets: [{
            label: 'Current Period',
            data: data.slice(0, 6),
            borderColor: 'rgba(0, 0, 0, 0.8)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 2
          }, {
            label: 'Previous Period',
            data: data.slice(6, 12),
            borderColor: 'rgba(0, 0, 0, 0.4)',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            borderWidth: 2
          }]
        };

      case 'gauge':
        const value = data[0] || 75;
        return {
          datasets: [{
            data: [value, 100 - value],
            backgroundColor: [
              `rgba(0, 0, 0, ${value / 100})`,
              'rgba(0, 0, 0, 0.1)'
            ],
            circumference: 180,
            rotation: 270
          }],
          value
        };

      case 'mixed':
        return {
          kpis: {
            current: data[0] || 85,
            target: data[1] || 100,
            progress: data[2] || 75
          },
          trend: {
            labels: months.slice(0, 6),
            datasets: [{
              label: 'Trend',
              data: data.slice(0, 6),
              borderColor: 'rgba(0, 0, 0, 0.8)',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              fill: true
            }]
          },
          distribution: {
            labels: ['A', 'B', 'C', 'D'],
            datasets: [{
              data: data.slice(6, 10),
              backgroundColor: [
                'rgba(0, 0, 0, 0.8)',
                'rgba(0, 0, 0, 0.6)',
                'rgba(0, 0, 0, 0.4)',
                'rgba(0, 0, 0, 0.2)'
              ]
            }]
          }
        };

      case 'sales':
      case 'trend':
        return {
          labels: months,
          datasets: [{
            label: 'Current Year',
            data: data.slice(0, 12),
            borderColor: 'rgba(0, 0, 0, 0.8)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            tension: 0.4,
            fill: true
          }]
        };

      case 'comparison':
        return {
          labels: months.slice(0, data.length / 2),
          datasets: [{
            label: 'Series A',
            data: data.slice(0, data.length / 2),
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }, {
            label: 'Series B',
            data: data.slice(data.length / 2),
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }]
        };

      case 'distribution':
        return {
          labels: ['Category A', 'Category B', 'Category C', 'Category D'],
          datasets: [{
            data: data.slice(0, 4),
            backgroundColor: [
              'rgba(0, 0, 0, 0.8)',
              'rgba(0, 0, 0, 0.6)',
              'rgba(0, 0, 0, 0.4)',
              'rgba(0, 0, 0, 0.2)'
            ]
          }]
        };

      default:
        return {
          labels: months,
          datasets: [{
            label: 'Values',
            data: data.slice(0, 12),
            borderColor: 'rgba(0, 0, 0, 0.8)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            tension: 0.4,
            fill: true
          }]
        };
    }
  }
}