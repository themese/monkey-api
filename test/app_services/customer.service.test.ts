import { Customer, CustomerId, NewCustomer } from "@src/domain-model/customer";
import { CustomerRepository } from "@src/domain-services/customer.repository";
import { CustomerService } from "@src/app-services/customer.service";
import { UserId } from "@src/domain-model/user";

it("Should get a customer", async () => {
  const mock: Customer[] = [
    {
      id: 1,
      name: 'Name1',
      surname: 'Surname1',
      createdBy: 1,
      lastUpdatedBy: 1,
      isDeleted: false,
      photo: 'https://monkey-images.s3.eu-central-1.amazonaws.com/b04d219e0c692dca1477a576a4259e8b.png'
    },
    {
      id: 2,
      name: 'Name2',
      surname: 'Surname2',
      createdBy: 1,
      lastUpdatedBy: 1,
      isDeleted: false,
      photo: 'https://monkey-images.s3.eu-central-1.amazonaws.com/b04d219e0c692dca1477a576a4259e8b.png'
    },
  ];
  const get = (id: CustomerId) => { return mock.find(x => x.id === id) };
  const customerRepoMock: CustomerRepository = {
    getCustomer: (id: CustomerId) => Promise.resolve(get(id)),
  } as any;
  const customerService = new CustomerService(customerRepoMock);
  const result = await customerService.getCustomer(1);
  expect(result).toEqual(mock[0]);
});

it("Should get all customers", async () => {
  const mock: Customer[] = [
    {
      id: 1,
      name: 'Name1',
      surname: 'Surname1',
      createdBy: 1,
      lastUpdatedBy: 1,
      isDeleted: false,
      photo: 'https://monkey-images.s3.eu-central-1.amazonaws.com/b04d219e0c692dca1477a576a4259e8b.png'
    },
    {
      id: 2,
      name: 'Name2',
      surname: 'Surname2',
      createdBy: 1,
      lastUpdatedBy: 1,
      isDeleted: false,
      photo: 'https://monkey-images.s3.eu-central-1.amazonaws.com/b04d219e0c692dca1477a576a4259e8b.png'
    },
  ];
  const get = () => { return mock };
  const customerRepoMock: CustomerRepository = {
    getCustomers: () => Promise.resolve(get()),
  } as any;
  const customerService = new CustomerService(customerRepoMock);
  const result = await customerService.getCustomers();
  expect(result).toEqual(mock);
});

it("Should add a customers", async () => {
  const mock: Customer[] = [
    {
      id: 1,
      name: 'Name1',
      surname: 'Surname1',
      createdBy: 1,
      lastUpdatedBy: 1,
      isDeleted: false,
      photo: 'https://monkey-images.s3.eu-central-1.amazonaws.com/b04d219e0c692dca1477a576a4259e8b.png'
    },
    {
      id: 2,
      name: 'Name2',
      surname: 'Surname2',
      createdBy: 1,
      lastUpdatedBy: 1,
      isDeleted: false,
      photo: 'https://monkey-images.s3.eu-central-1.amazonaws.com/b04d219e0c692dca1477a576a4259e8b.png'
    },
  ];
  const add = (newCustomer: NewCustomer, createdBy: UserId) => {
    mock.push({
      id: mock.length + 1,
      createdBy: createdBy,
      lastUpdatedBy: createdBy,
      isDeleted: false,
      name: newCustomer.name,
      surname: newCustomer.surname,
      photo: newCustomer.photo,
    });
    return mock[mock.length - 1];
  }
  const customerRepoMock: CustomerRepository = {
    createCustomer: (newCustomer: NewCustomer, createdBy: UserId) => Promise.resolve(add(newCustomer, createdBy)),
  } as any;
  const newCustomer: NewCustomer = {
    name: 'Name3',
    surname: 'Surnam3',
    photo: 'https://monkey-images.s3.eu-central-1.amazonaws.com/b04d219e0c692dca1477a576a4259e8b.png'
  }
  const customerService = new CustomerService(customerRepoMock);
  const result = await customerService.createCustomer(newCustomer, 1);
  expect(result).toEqual(mock[mock.length - 1]);
  expect(mock.length).toEqual(3);
  expect(mock[2] === result);
});

it("Should update a customer", async () => {
  const mock: Customer[] = [
    {
      id: 1,
      name: 'Name1',
      surname: 'Surname1',
      createdBy: 1,
      lastUpdatedBy: 1,
      isDeleted: false,
      photo: 'https://monkey-images.s3.eu-central-1.amazonaws.com/b04d219e0c692dca1477a576a4259e8b.png'
    },
    {
      id: 2,
      name: 'Name2',
      surname: 'Surname2',
      createdBy: 1,
      lastUpdatedBy: 1,
      isDeleted: false,
      photo: 'https://monkey-images.s3.eu-central-1.amazonaws.com/b04d219e0c692dca1477a576a4259e8b.png'
    },
  ];
  const update = (customer: Customer, updatedBy: UserId) => {
    const mockCustomer = mock.find(x => x.id === customer.id);
    mockCustomer.name = customer.name;
    mockCustomer.surname = customer.surname;
    mockCustomer.createdBy = customer.createdBy;
    mockCustomer.lastUpdatedBy = updatedBy;
    mockCustomer.isDeleted = customer.isDeleted;
    mockCustomer.photo = customer.photo;
    return mockCustomer;
  }
  const customerRepoMock: CustomerRepository = {
    updateCustomer: (customer: Customer, updatedBy: UserId) => Promise.resolve(update(customer, updatedBy)),
  } as any;
  const customer: Customer = {
    id: 1,
    name: 'updatedName',
    surname: 'updatedSurname',
    createdBy: 1,
    lastUpdatedBy: 1,
    isDeleted: false,
    photo: 'https://monkey-images.s3.eu-central-1.amazonaws.com/b04d219e0c692dca1477a576a4259e8b.png'
  }
  const customerService = new CustomerService(customerRepoMock);
  const result = await customerService.updateCustomer(customer, 2);
  expect(mock.length).toEqual(2);
  expect(result).toEqual(mock[0]);
});

it("Should delete a customer", async () => {
  const mock: Customer[] = [
    {
      id: 1,
      name: 'Name1',
      surname: 'Surname1',
      createdBy: 1,
      lastUpdatedBy: 1,
      isDeleted: false,
      photo: 'https://monkey-images.s3.eu-central-1.amazonaws.com/b04d219e0c692dca1477a576a4259e8b.png'
    },
    {
      id: 2,
      name: 'Name2',
      surname: 'Surname2',
      createdBy: 1,
      lastUpdatedBy: 1,
      isDeleted: false,
      photo: 'https://monkey-images.s3.eu-central-1.amazonaws.com/b04d219e0c692dca1477a576a4259e8b.png'
    },
  ];
  const remove = (id: CustomerId, updatedBy: UserId) => {
    const mockCustomer = mock.find(x => x.id === id);
    mockCustomer.lastUpdatedBy = updatedBy;
    mockCustomer.isDeleted = true;
    return mockCustomer;
  }
  const customerRepoMock: CustomerRepository = {
    deleteCustomer: (id: CustomerId, updatedBy: UserId) => Promise.resolve(remove(id, updatedBy)),
  } as any;
  const customerService = new CustomerService(customerRepoMock);
  const result = await customerService.deleteCustomer(1, 2);
  expect(mock.length).toEqual(2);
  expect(result).toEqual(mock[0]);
});