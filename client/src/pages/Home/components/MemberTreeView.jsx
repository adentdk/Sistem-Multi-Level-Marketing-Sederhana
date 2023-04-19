import { useCallback, useMemo } from "react";

export default function MemberTreeView({members, fetchMember}) {

  const handleFetchMember = useCallback((id) => fetchMember(id), [fetchMember])

  const memberTreeComponents = useMemo(() => {
    const mapMember = (_members, level) => {
      return _members.map((member, index) => {
        const showLoadMore = member.nextLevelCount > 0 && !member.fetched;

        const handleClick = () => {
          handleFetchMember(member.id)
        }

        return (
          <li key={member.id}>
            <div className="flex flex-col items-center justify-center capitalize space-y-2 box">
              <div>
                <h2 className="text-lg">
                  {member.name}
                </h2>
                <div className="text-sm text-slate-600">Member ID: #{member.id}</div>
              </div>


              {member.bonuses && (
                <div className="font-light">
                  bonus: ${member.bonuses}
                </div>
              )}

              {showLoadMore && (
                <button
                  className={'w-full py-px px-px rounded-full uppercase text-sm text-white font-semibold bg-blue-600'}
                  onClick={handleClick}>
                  load more
                </button>
              )}
            </div>
            {member.children?.length && (
              <ul>
                {mapMember(member.children, level + 1)}
              </ul>
            )}
          </li>
        )
      })
    }

    return mapMember(members, 1)

  }, [members]);

  return (
    <div className="flex flex-col bg-slate-200 w-full h-[100vh] lg:h-[60vh] overflow-y-auto overflow-x-auto border-blue-900 border">
      <ul className="tree">
        <li>
          <div className="box">ADMIN</div>
          <ul>
            {memberTreeComponents}
          </ul>
        </li>
      </ul>
    </div>
  )
}