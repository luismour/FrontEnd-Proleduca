import { useAppContext } from '../contexts/AppContext';

export default function FavoritesPage() {
  const { favorites, opportunities } = useAppContext();

  const favoriteOpportunities = opportunities.filter(opportunity =>
    favorites.includes(opportunity.id)
  );

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">Favoritos</h2>
      {favoriteOpportunities.length > 0 ? (
        favoriteOpportunities.map((opportunity) => (
          <div key={opportunity.id} className="mb-2">
            <p>{opportunity.institution} - {opportunity.course}</p>
          </div>
        ))
      ) : (
        <p>Nenhum favorito ainda.</p>
      )}
    </div>
  );
}
