import customerRepository from "./customer.repository";

const customerService = {
  async createCustomer(data: any) {
    try {
      return await customerRepository.createCustomer(data);
    } catch (error) {
      throw new Error("Failed to create customer");
    }
  },

  async getCustomers() {
    try {
      return await customerRepository.getAllCustomers();
    } catch (error) {
      throw new Error("Failed to get customers");
    }
  },

  async getCustomerDetail(id: string) {
    try {
      const customer = await customerRepository.getCustomerById(id);

      if (!customer) {
        throw new Error("Customer not found with the provided ID");
      }

      return customer;
    } catch (error) {
      throw new Error("Failed to get customer detail");
    }
  },

  async getCustomersWithPagination(params : any) {
    try {
      return await customerRepository.getCustomersWithPagination(
       params
      );
    } catch (error : any) {
      throw new Error(error.message || "Failed to get customers with pagination");
    }
  },

  async updateCustomer(id: string, data: any) {
    try {
      const isCustomerExist = await customerRepository.getCustomerById(id);

      if (!isCustomerExist) {
        throw new Error("Customer not found with the provided ID");
      }

      return await customerRepository.updateCustomer(id, data);
    } catch (error) {
      throw new Error("Failed to update customer");
    }
  },

  async deleteCustomer(id: string) {
    try {
      const isCustomerExist = await customerRepository.getCustomerById(id);

      if (!isCustomerExist) {
        throw new Error("Customer not found with the provided ID");
      }

      return await customerRepository.deleteCustomer(id);
    } catch (error) {
      throw new Error("Failed to delete customer");
    }
  },
};

export default customerService;
