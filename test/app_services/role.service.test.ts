import { RoleService } from "@src/app-services/role.service";
import { NewRole, Role, RoleId } from "@src/domain-model/role";
import { RoleRepository } from "@src/domain-services/role.repository";

it("Should get role", async () => {
  const mock: Role[] = [
    {
      id: 1,
      name: 'admin'
    },
    {
      id: 2,
      name: 'user'
    },
  ];
  const get = (id: RoleId) => { return mock.find(x => x.id === id) };
  const roleRepoMock: RoleRepository = {
    getRole: (id: RoleId) => Promise.resolve(get(id)),
  } as any;
  const roleService = new RoleService(roleRepoMock);
  const result = await roleService.getRole(1);
  expect(result).toEqual(mock[0]);
});

it("Should get all roles", async () => {
  const mock: Role[] = [
    {
      id: 1,
      name: 'admin'
    },
    {
      id: 2,
      name: 'user'
    },
  ];
  const get = () => {
    return mock;
  }
  const roleRepoMock: RoleRepository = {
    getRoles: () => Promise.resolve(get()),
  } as any;
  const roleService = new RoleService(roleRepoMock);
  const result = await roleService.getRoles();
  expect(result).toEqual(mock);
});

it("Should add a role", async () => {
  const mock: Role[] = [
    {
      id: 1,
      name: 'admin'
    },
    {
      id: 2,
      name: 'user'
    },
  ];
  const add = (newRole: NewRole) => {
    mock.push({
      id: mock.length + 1,
      name: newRole.name
    });
  }
  const roleRepoMock: RoleRepository = {
    createRole: (newRole: NewRole) => Promise.resolve(add(newRole)),
  } as any;
  const roleService = new RoleService(roleRepoMock);
  expect(mock.length).toEqual(2);
  const newRoleName = 'bestRoleEvah'
  const result = await roleService.createRole({ name: newRoleName });
  expect(mock.length).toEqual(3);
  expect(mock[2].name === newRoleName);
  expect(mock[2].id === 3);
  expect(mock[2] === result);
});

it("Should update a role", async () => {
  const mock: Role[] = [
    {
      id: 1,
      name: 'admin'
    },
    {
      id: 2,
      name: 'user'
    },
  ];
  const updateRole = (role: Role) => {
    const mockRole = mock.find(x => x.id === role.id);
    mockRole.name = role.name;
    return mockRole;
  }
  const roleRepoMock: RoleRepository = {
    updateRole: (role: Role) => Promise.resolve(updateRole(role)),
  } as any;
  const roleService = new RoleService(roleRepoMock);
  const updatedRole = { id: 1, name: 'smooth-operator' }
  const result = await roleService.updateRole(updatedRole);
  expect(mock.length).toEqual(2);
  expect(mock[1].name === result.name);
});

it("Should delete a role", async () => {
  const mock: Role[] = [
    {
      id: 1,
      name: 'admin'
    },
    {
      id: 2,
      name: 'user'
    },
  ];
  const deleteRole = (id: RoleId) => {
    const index = mock.indexOf(mock.find(x => x.id === id));
    if (index > -1) {
      mock.splice(index, 1);
    }
  };
  const roleRepoMock: RoleRepository = {
    deleteRole: (id: RoleId) => Promise.resolve(deleteRole(id)),
  } as any;
  const roleService = new RoleService(roleRepoMock);
  expect(mock.length).toEqual(2);
  const result = await roleService.deleteRole(1);
  expect(mock.length).toEqual(1);
  expect(mock[0].id === 2);
});
