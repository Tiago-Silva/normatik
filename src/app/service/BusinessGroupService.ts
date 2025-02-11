import {BusinessGroup, NewBusinessGroup} from "@/app/interface/BusinessGroup";

export class BusinessGroupService {
  private async request<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Erro: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  }

  async createBusinessGroup(data: NewBusinessGroup) {
    return this.request('/api/business-groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  async getBusinessGroupById(id: string) {
    return this.request(`/api/business-groups/${id}`, { method: 'GET' });
  }

  async getAllBusinessGroups(): Promise<BusinessGroup[]> {
    return this.request('/api/business-groups', { method: 'GET' });
  }

  async updateBusinessGroup(businessGroup: BusinessGroup) {
    return this.request(`/api/business-groups/${businessGroup.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: businessGroup.name,
        status: businessGroup.status,
      }),
    });
  }

  async deleteBusinessGroup(id: string) {
    return this.request(`/api/business-groups/${id}`, { method: 'DELETE' });
  }
}