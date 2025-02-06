export class BusinessGroupService {
  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  }

  async createBusinessGroup(data: { name: string; status: boolean }) {
    return this.request('/api/business-groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  async getBusinessGroupById(id: string) {
    return this.request(`/api/business-groups/${id}`, { method: 'GET' });
  }

  async getAllBusinessGroups() {
    return this.request('/api/business-groups', { method: 'GET' });
  }

  async updateBusinessGroup(id: string, data: Partial<{ name: string; status: boolean }>) {
    return this.request(`/api/business-groups/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  async deleteBusinessGroup(id: string) {
    return this.request(`/api/business-groups/${id}`, { method: 'DELETE' });
  }
}