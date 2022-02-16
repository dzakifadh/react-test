import { useEffect, useState, Fragment } from "react"
import "./App.css"

function App() {
	const KEY_API = "25721109-43fefb31d736bd126016752a5"

	const [collection, getCollection] = useState([])
	const [detail, getDetail] = useState([])
	const [type, getType] = useState()
	const [isModalShow, setIsModalShow] = useState(false)
	const [perPage, setPerPage] = useState(20)

	const setModal = (id) => {
		const detailData = collection.filter((item) => item.id === id)
		getDetail(detailData)
		setIsModalShow(!isModalShow)
	}

	useEffect(() => {
		const getAllData = async () => {
			const allPixabyDataResultData = await fetch(`https://pixabay.com/api/?key=${KEY_API}&q=${encodeURIComponent(type || "yellow flower")}&image_type=photo&pretty=true&per_page=${perPage}`)
			const allPixabyDataResult = await allPixabyDataResultData.json()
			getCollection(allPixabyDataResult.hits)
		}
		getAllData()
	}, [type, perPage])

	useEffect(() => {}, [isModalShow])

	return (
		<div className="relative">
			<div className="flex flex-col items-center justify-center mb-10">
				<div className="flex flex-col items-center my-4">
					<label className="mb-4 text-3xl font-semibold">PIXABY</label>
					<input type="text" value={type} className="px-4 py-2 border-2 rounded" placeholder="Search Here ..." onChange={(e) => getType(e.target.value)} />
				</div>
				<div className="flex flex-wrap justify-center gap-4 m-10">
					{collection.length > 0
						? collection.map((item, index) => (
								<div key={index} className="overflow-hidden hover:cursor-pointer group" onClick={() => setModal(item.id)}>
									<img src={item.webformatURL} alt={`Thumbnail ${item.id}`} className="object-cover w-64 h-48 duration-200 group-hover:scale-110" />
								</div>
						  ))
						: " So sory, we cannot find what did you search :("}
				</div>
				{collection.length !== 0 && (
					<button type="button" className="px-8 py-3 text-white rounded bg-slate-700" onClick={() => setPerPage((prev) => prev + 10)}>
						Load More
					</button>
				)}
			</div>

			<div className={`fixed inset-0 flex items-center justify-center ${isModalShow ? "opacity-1 z-10 visible" : "opacity-0 -z-10 invisible"} bg-opacity-50 bg-slate-900 duration-200`}>
				<div className={`relative w-2/4 p-6 bg-white rounded text-slate-900 duration-500 ${isModalShow ? "translate-y-0 visible" : "translate-y-20 invisible"}`}>
					<span className="absolute top-6 right-6 hover:cursor-pointer" onClick={() => setIsModalShow(false)}>
						<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</span>
					<h2 className="mb-6 text-2xl font-medium">Detail data</h2>
					<ul className="grid grid-cols-3 gap-4">
						{detail.map((item, index) => (
							<Fragment key={index}>
								<li>
									<p className="mb-4 font-medium">Author</p>
									<div className="flex items-center gap-4">
										{item.userImageURL !== "" ? (
											<img src={item.userImageURL} alt={`Author thumbnail, ${item.userImageURL}`} className="w-12 h-12 rounded-full" />
										) : (
											<img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.user)}`} alt={`Author thumbnail, ${item.userImageURL}`} className="w-12 h-12 rounded-full" />
										)}
										<span>{item.user}</span>
									</div>
								</li>
								<li>
									<p className="font-medium">Views</p>
									<span>{item.views}</span>
								</li>
								<li>
									<p className="font-medium">Likes</p>
									<span>{item.likes}</span>
								</li>
								<li>
									<p className="font-medium">Downloads</p>
									<span>{item.downloads}</span>
								</li>
								<li>
									<p className="font-medium">Types</p>
									<span>{item.type}</span>
								</li>
								<li>
									<p className="font-medium">Tags</p>
									<span>{item.tags}</span>
								</li>
							</Fragment>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default App
