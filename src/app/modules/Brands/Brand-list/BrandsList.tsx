import { ListViewProvider, useListView } from './core/ListViewProvider'
import { QueryRequestProvider } from './core/QueryRequestProvider'
import { QueryResponseProvider } from './core/QueryResponseProvider'
import { BrandsListHeader } from './components/header/BrandsListHeader'
import { BrandsTable } from './table/BrandsTable'
import { BrandsEditModal } from './Brands-edit-modal/BrandsEditModal'
import { KTCard } from '../../../../_metronic/helpers'
import { useState } from 'react'
import UserContext from './table/columns/context'






const BrandsList = () => {
  const { itemIdForUpdate } = useListView()

  const [searchTerm, setSearchTerm] = useState<string>('')
  return (
    <>
      <KTCard>
        <UserContext.Provider value={{ searchTerm, setSearchTerm }}>
          <BrandsListHeader />
          <BrandsTable />
        </UserContext.Provider>

      </KTCard>
      {itemIdForUpdate !== undefined && <BrandsEditModal />}
    </>
  )
}
const BrandsListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <BrandsList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export { BrandsListWrapper }
