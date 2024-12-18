/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useMemo, useState } from 'react'
import { useTable, ColumnInstance, Row } from 'react-table'
import { CustomHeaderColumn } from '../table/columns/CustomHeaderColumn'
import { CustomRow } from '../table/columns/CustomRow'
import { useQueryResponseData, useQueryResponseLoading } from '../core/QueryResponseProvider'
import { usersColumns } from './columns/_columns'
import { User } from '../core/_models'
import { UsersListLoading } from '../components/loading/UsersListLoading'
import { UsersListPagination } from '../components/pagination/UsersListPagination'
import { KTCardBody } from '../../../../../_metronic/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersByCompanyId, getAllUsers, UsersLoading } from '../_redux/userAction'
import UserContext from './columns/context'
import { Pagination } from '@mui/material'

const UsersTable = () => {
  const users = useSelector(
    (state: any) => state?.ManageUserData?.Users
  );
  const loading = useSelector(
    (state: any) => state?.ManageUserData?.Loading
  );
  const usersByCompanyId = useSelector(
    (state: any) => state?.ManageUserData?.UsersByCompanyId
  );
  const token = useSelector(
    (state: any) => state?.auth?.authToken
  );
  const userData = useSelector(
    (state: any) => state?.auth?.user
  );
  const isLoading = useQueryResponseLoading()
  const dispatch = useDispatch()

  const [perPage, setPerPage] = useState([]);
  const [user, setUser] = useState([]);

  console.log(perPage, "perPage");

  useEffect(() => {
    if (userData?.isSuperAdmin === true) {
      setUser(users);
      setPerPage(users.slice(0, 10));
    }
    else {
      setUser(usersByCompanyId);
      setPerPage(usersByCompanyId.slice(0, 10));
    }

  }, [users])
  const pageHandler = (pageNumber: any) => {
    setPerPage(user.slice(pageNumber * 10 - 10, pageNumber * 10));
  };
  const pageNumbers = [];
  for (let i = 1; i < Math.ceil(user.length / 10) + 1; i++) {
    pageNumbers.push(i);
  }

  const data = useMemo(() => perPage, [perPage])
  const columns = useMemo(() => usersColumns, [])
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } = useTable({
    columns,
    data,
  })
  console.log(data);
  useEffect(() => {
    dispatch(getAllUsers(token))
    dispatch(UsersLoading(false))
  }, [loading])
  useEffect(() => {
    dispatch(fetchUsersByCompanyId(userData?.company?.id, token))
  }, [])
  console.log(user, "users")
  console.log(usersByCompanyId, "usersByCompanyId")
  const { searchTerm } = useContext(UserContext);
  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<User>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.filter((val: any) => {
                if (searchTerm === "") {
                  return val;
                }
                if (val?.original?.username?.toLowerCase()?.includes(searchTerm?.toLowerCase())) {
                  return val;
                }
                if (val?.original?.mobile?.toLowerCase()?.includes(searchTerm?.toLowerCase())) {
                  return val;
                }
                if (val?.original?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase())) {
                  return val;
                }
              }).map((row: Row<User>, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No matching records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* <UsersListPagination /> */}
      <div className='d-flex flex-end'>
        <Pagination
          // justifyContent="center"
          count={pageNumbers.length}
          onChange={(e, value) => pageHandler(value)}
          color="primary"
        />
      </div>
      {isLoading && <UsersListLoading />}
    </KTCardBody>
  )
}

export { UsersTable }
