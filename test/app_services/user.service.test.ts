import { NewUser, User, UserId } from "@src/domain-model/user";
import { RoleRepository } from "@src/domain-services/role.repository";
import { UserRepository } from "@src/domain-services/user.repository";
import { UserService } from "@src/app-services/user.service";
import { Role, RoleId } from "@src/domain-model/role";

it("Should get a user", async () => {
  const mock: User[] = [
    {
      id: 1,
      email: 'jousema.fernandez@gmail.com',
      roleId: 1,
      isDeleted: false,
    },
    {
      id: 2,
      email: 'dev.loper@dev.com',
      roleId: 2,
      isDeleted: true,
    },
  ];
  const mockRole: Role[] = [{
    id: 1,
    name: 'admin'
  }];
  const getUser = (id: UserId, requesterId: UserId) => {
    return mock.find(x => x.id === id);
  }
  const getRole = (id: RoleId) => { return mockRole.find(x => x.id === id) };
  const roleRepoMock: RoleRepository = {
    getRole: (id: RoleId) => Promise.resolve(getRole(id)),
  } as any;
  const userRepoMock: UserRepository = {
    getUser: (id: UserId, requesterId: UserId) => Promise.resolve(getUser(id, requesterId)),
  } as any;
  const userService = new UserService(userRepoMock, roleRepoMock);
  const result = await userService.getUser(1, 1);
  expect(result).toEqual(mock[0]);
});

it("Should get all users", async () => {
  const mock: User[] = [
    {
      id: 1,
      email: 'jousema.fernandez@gmail.com',
      roleId: 1,
      isDeleted: false,
    },
    {
      id: 2,
      email: 'dev.loper@dev.com',
      roleId: 2,
      isDeleted: true,
    },
  ];
  const mockRole: Role[] = [{
    id: 1,
    name: 'admin'
  }];
  const get = (requesterId: UserId) => {
    return mock;
  }
  const getUser = (id: UserId, requesterId: UserId) => {
    return mock.find(x => x.id === id);
  }
  const getRole = (id: RoleId) => { return mockRole.find(x => x.id === id) };
  const roleRepoMock: RoleRepository = {
    getRole: (id: RoleId) => Promise.resolve(getRole(id)),
  } as any;
  const userRepoMock: UserRepository = {
    getUsers: (requesterId: UserId) => Promise.resolve(get(requesterId)),
    getUser: (id: UserId, requesterId: UserId) => Promise.resolve(getUser(id, requesterId)),
  } as any;
  const userService = new UserService(userRepoMock, roleRepoMock);
  const result = await userService.getUsers(1);
  expect(result.length).toEqual(2);
  expect(result).toEqual(mock);
});

it("Should create a user", async () => {
  const mock: User[] = [
    {
      id: 1,
      email: 'jousema.fernandez@gmail.com',
      roleId: 1,
      isDeleted: false,
    },
    {
      id: 2,
      email: 'dev.loper@dev.com',
      roleId: 2,
      isDeleted: true,
    },
  ];
  const mockRole: Role[] = [{
    id: 1,
    name: 'admin'
  }];
  const add = (newUser: NewUser, requester: UserId) => {
    const i = mock.push({
      id: mock.length + 1,
      email: newUser.email,
      roleId: newUser.roleId,
      isDeleted: false,
    });
    return mock[i - 1];
  }
  const getRole = (id: RoleId) => { return mockRole.find(x => x.id === id) };
  const getUser = (id: UserId, requesterId: UserId) => {
    return mock.find(x => x.id === id);
  }
  const roleRepoMock: RoleRepository = {
    getRole: (id: RoleId) => Promise.resolve(getRole(id)),
  } as any;
  const userRepoMock: UserRepository = {
    createUser: (newUser: NewUser, requester: UserId) => Promise.resolve(add(newUser, requester)),
    getUser: (id: UserId, requesterId: UserId) => Promise.resolve(getUser(id, requesterId)),
  } as any;
  const userService = new UserService(userRepoMock, roleRepoMock);
  const newUser: NewUser = {
    email: 'josema@theagilemonkeys.com',
    roleId: 2
  };
  const result = await userService.createUser(newUser, 1);
  expect(mock.length).toEqual(3);
  expect(result).toEqual(mock[2]);
});

it("Should update a user", async () => {
  const mock: User[] = [
    {
      id: 1,
      email: 'jousema.fernandez@gmail.com',
      roleId: 1,
      isDeleted: false,
    },
    {
      id: 2,
      email: 'dev.loper@dev.com',
      roleId: 2,
      isDeleted: true,
    },
  ];
  const mockRole: Role[] = [{
    id: 1,
    name: 'admin'
  }];
  const update = (user: User, requester: UserId) => {
    const mockUser = mock.find(x => x.id === user.id);
    mockUser.email = user.email;
    mockUser.roleId = user.roleId;
    mockUser.isDeleted = false;
    return mockUser;
  }
  const getRole = (id: RoleId) => { return mockRole.find(x => x.id === id) };
  const getUser = (id: UserId, requesterId: UserId) => {
    return mock.find(x => x.id === id);
  }
  const roleRepoMock: RoleRepository = {
    getRole: (id: RoleId) => Promise.resolve(getRole(id)),
  } as any;
  const userRepoMock: UserRepository = {
    updateUser: (user: User, requester: UserId) => Promise.resolve(update(user, requester)),
    getUser: (id: UserId, requesterId: UserId) => Promise.resolve(getUser(id, requesterId)),
  } as any;
  const userService = new UserService(userRepoMock, roleRepoMock);
  const user: User = {
    id: 1,
    email: 'josema@theagilemonkeys.com',
    roleId: 2,
    isDeleted: false,
  };
  const result = await userService.updateUser(user, 1);
  expect(result).toEqual(mock.find(x => result.id));
  expect(mock.length).toEqual(2);
});

it("Should soft delete a user", async () => {
  const mock: User[] = [
    {
      id: 1,
      email: 'jousema.fernandez@gmail.com',
      roleId: 1,
      isDeleted: false,
    },
    {
      id: 2,
      email: 'dev.loper@dev.com',
      roleId: 2,
      isDeleted: true,
    },
  ];
  const mockRole: Role[] = [{
    id: 1,
    name: 'admin'
  }];
  const remove = (id: UserId, requester: UserId) => {
    const mockUser = mock.find(x => x.id === id);
    mockUser.isDeleted = true;
    return mockUser;
  }
  const getUser = (id: UserId, requesterId: UserId) => {
    return mock.find(x => x.id === id);
  }
  const getRole = (id: RoleId) => { return mockRole.find(x => x.id === id) };
  const roleRepoMock: RoleRepository = {
    getRole: (id: RoleId) => Promise.resolve(getRole(id)),
  } as any;
  const userRepoMock: UserRepository = {
    deleteUser: (id: UserId, requester: UserId) => Promise.resolve(remove(id, requester)),
    getUser: (id: UserId, requesterId: UserId) => Promise.resolve(getUser(id, requesterId)),
  } as any;
  const userService = new UserService(userRepoMock, roleRepoMock);
  const result = await userService.deleteUser(1, 1);
  expect(result).toEqual(mock.find(x => result.id));
  expect(mock.length).toEqual(2);
});

