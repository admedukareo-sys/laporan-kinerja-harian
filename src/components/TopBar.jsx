import Icon from "./Icon";

const DEFAULT_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC2cVr1pgaIUPd8la9AQdL1D8NacUyTPYUWvTPPsiUoRaRArjGz02LQ_Wo1JQifBJbJt89kjEloS3KhcRI3qU6uSw388j1zJsKuK_mFITj28ru4Hqv8yFyVBXB2nNv_7TclMz4ZKcC5RbtbkL5Yd9E0FBulP3MXLafOpMlCZL5_CAavMivlmC2TylG84zYjlfCEK5Xrzjx--Xy786EJzXFRESsqSwA7pXn0Pk2J4VWjW4qD8gr-wKuw";

export default function TopBar({
  fullName = "Budi Santoso",
  role = "Senior Developer",
  avatarUrl,
}) {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 flex justify-between items-center px-lg z-10 bg-surface border-b border-outline-variant">
      <div className="flex items-center bg-surface-container-low px-md py-xs rounded-full border border-outline-variant w-96">
        <Icon name="search" className="text-outline" />
        <input
          className="bg-transparent border-none focus:ring-0 text-body-md w-full placeholder:text-outline-variant outline-none"
          placeholder="Cari laporan atau tugas..."
          type="text"
        />
      </div>

      <div className="flex items-center gap-md">
        <div className="flex gap-sm">
          <button className="p-sm text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all">
            <Icon name="notifications" />
          </button>
          <button className="p-sm text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all">
            <Icon name="help" />
          </button>
          <button className="p-sm text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all">
            <Icon name="settings" />
          </button>
        </div>

        <div className="h-8 w-[1px] bg-outline-variant"></div>

        <div className="flex items-center gap-sm cursor-pointer hover:bg-surface-container-low p-xs rounded-lg transition-all">
          <div className="text-right hidden lg:block">
            <p className="font-label-md text-on-surface">{fullName}</p>
            <p className="text-[10px] text-outline">{role}</p>
          </div>
          <img
            className="w-10 h-10 rounded-full border-2 border-primary-fixed"
            alt={`Foto profil ${fullName}`}
            src={avatarUrl || DEFAULT_AVATAR}
          />
        </div>
      </div>
    </header>
  );
}
